/**
 * External dependencies
 */
import type { BaseControl } from '@wordpress/components';
/**
 * Internal dependencies
 */
import type { LabelProps } from '../../../components/label/label';
import type {
	ProductEditorBlockAttributes,
	ProductEditorBlockEditProps,
} from '../../../types';

type AllowedFormat =
	| 'core/bold'
	| 'core/code'
	| 'core/italic'
	| 'core/link'
	| 'core/strikethrough'
	| 'core/underline'
	| 'core/text-color'
	| 'core/subscript'
	| 'core/superscript'
	| 'core/unknown';

export type TextAreaBlockEditAttributes = ProductEditorBlockAttributes & {
	property: string;
	placeholder?: string;
	disabled?: boolean;
	align?: 'left' | 'center' | 'right' | 'justify';
	allowedFormats?: AllowedFormat[];
	direction?: 'ltr' | 'rtl';
} & LabelProps &
	BaseControl.ControlProps;

export type TextAreaBlockEditProps =
	ProductEditorBlockEditProps< TextAreaBlockEditAttributes >;
