/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { isObject, objectHasProp } from '@woocommerce/types';
import { isPackageRateCollectable } from '@woocommerce/base-utils';

/**
 * Shows a formatted pickup location.
 */

const DOWS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PickupLocation = (): JSX.Element | null => {
	const { pickupAddress, dayOfWeek, timeSlot } = useSelect( ( select ) => {
		const cartShippingRates = select( 'wc/store/cart' ).getShippingRates();

		const flattenedRates = cartShippingRates.flatMap(
			( cartShippingRate ) => cartShippingRate.shipping_rates
		);
		const selectedCollectableRate = flattenedRates.find(
			( rate ) => rate.selected && isPackageRateCollectable( rate )
		);

		// If the rate has an address specified in its metadata.
		if (
			isObject( selectedCollectableRate ) &&
			objectHasProp( selectedCollectableRate, 'meta_data' )
		) {
			const selectedRateMetaData = selectedCollectableRate.meta_data.find(
				( meta ) => meta.key === 'pickup_address'
			);
			const dow = selectedCollectableRate.meta_data.find(
				( meta ) => meta.key === 'dow'
			);
			let dayOfWeek = '';
			let timeSlot = '';
			if(isObject( dow ) &&
				objectHasProp( dow, 'value' ) &&
				dow.value) {
				const dIndex = parseInt(dow.value, 10);
				if(dIndex) {
					dayOfWeek = DOWS[dIndex];
				}
			}
			const timeSlotRaw = selectedCollectableRate.meta_data.find(
				( meta ) => meta.key === "timeslot"
			)

			if(isObject( timeSlotRaw ) &&
				objectHasProp( timeSlotRaw, 'value' ) &&
				timeSlotRaw.value) {
				timeSlot = timeSlotRaw.value;
			}

			if (
				isObject( selectedRateMetaData ) &&
				objectHasProp( selectedRateMetaData, 'value' ) &&
				selectedRateMetaData.value
			) {
				const selectedRatePickupAddress = selectedRateMetaData.value;
				return {
					pickupAddress: selectedRatePickupAddress,
					dayOfWeek: dayOfWeek,
					timeSlot: timeSlot

				};
			}
		}

		if ( isObject( selectedCollectableRate ) ) {
			return {
				pickupAddress: undefined,
				dayOfWeek: '',
				timeSlot: ''
			};
		}
		return {
			pickupAddress: undefined,
			dayOfWeek: '',
			timeSlot: ''
		};
	} );

	// If the method does not contain an address, or the method supporting collection was not found, return early.
	if ( typeof pickupAddress === 'undefined' ) {
		return null;
	}

	// Show the pickup method's name if we don't have an address to show.
	return (
		<span className="wc-block-components-shipping-address">
			{ sprintf(
				/* translators: %s: shipping method name, e.g. "Amazon Locker" */
				__( 'Collection from %s, on %s %s', 'woocommerce' ),
				pickupAddress, dayOfWeek, timeSlot
			) + ' ' }
		</span>
	);
};

export default PickupLocation;
