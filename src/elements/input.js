import React from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash.startcase';
import { useDispatch } from 'react-redux';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { Form, Input, TextArea, Label, Dropdown } from 'semantic-ui-react';

const CustomInput = ({ type, value, rows, size, path, placeholder, options, pointing, label, extraLabel, extraLabelPointing, InputComp, onChange, style, inputStyle, ...rest }) => {
    const dispatch = useDispatch();

    const _onChange = (e, arg) => {
        if (onChange) {
            if (type === 'select') {
                onChange(arg.value);
                trackCustomEvent({
                    category: `Select Option - "${arg.value}"`,
                    action: 'Select',
                    label: 'Select Option',
                });
            } else {
                onChange(e.target.value);
                trackCustomEvent({
                    category: `Change Input - "${arg.value}"`,
                    action: 'Input',
                    label: 'Change Input',
                });
            }
        } else {
            dispatch({
                type: 'SET_FIELD', 
                payload: { 
                    path, 
                    value: type === 'select' ? e : e.target.value,
                }, 
            });
            trackCustomEvent({
                category: `Change Input (Type, Value) - "(${type}, ${type === 'select' ? e : e.target.value})"`,
                action: 'Change Input Type',
                label: 'Change Input Type',
            });
        }
    };

    if (type === 'textarea') {
        return (
            <Form.Field style={style}>
                <TextArea 
                    rows={rows}
                    value={value}
                    style={inputStyle}
                    onChange={_onChange}
                    placeholder={placeholder}
                    className={`border rounded-lg py-2 px-4 w-full block ${label ? '' : `leading-relaxed lg:text-left lg:mx-8 lg:text-lg`}`}
                />
                {label && (
                    <Label pointing={pointing}>{label}</Label>
                )}
                {extraLabel && (
                    <Label pointing={extraLabelPointing}>{extraLabel}</Label>
                )}
            </Form.Field>
        );
    }

    if (type === 'select') {
        return (
            <Form.Field style={style}>
                <Dropdown 
                    selection
                    placeholder={placeholder}
                    options={options.map(opt => ({
                        key: opt,
                        value: opt,
                        text: startCase(opt),
                    }))}
                    value={value}
                    style={inputStyle}
                    onChange={_onChange}
                    {...rest}
                />
                {label && (
                    <Label pointing={pointing}>{label}</Label>
                )}
                {extraLabel && (
                    <Label pointing={extraLabelPointing}>{extraLabel}</Label>
                )}
            </Form.Field>
        );
    }

    if (type === 'range') {
        return (
            <Form.Field style={style}>
                <input 
                    type={type} 
                    value={value} 
                    style={inputStyle}
                    onChange={_onChange}
                    {...rest}
                />
                {label && (
                    <Label pointing={pointing}>{label}</Label>
                )}
                {extraLabel && (
                    <Label pointing={extraLabelPointing}>{extraLabel}</Label>
                )}
            </Form.Field>
        );
    }

    return (
        <Form.Field style={style}>
            {InputComp ? InputComp : (
                <Input 
                    size={size}
                    type={type} 
                    value={value} 
                    style={inputStyle}
                    onChange={_onChange}
                    placeholder={placeholder} 
                    {...rest}
                />
            )}
            {label && (
                <Label pointing={pointing}>{label}</Label>
            )}
            {extraLabel && (
                <Label pointing={extraLabelPointing}>{extraLabel}</Label>
            )}
        </Form.Field>
    );
};

CustomInput.propTypes = {
    type: PropTypes.oneOf(['textarea', 'text', 'url', 'range', 'email', 'tel']),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    pointing: PropTypes.string,
    size: PropTypes.string,
    label: PropTypes.string,
    extraLabel: PropTypes.string,
    extraLabelPointing: PropTypes.string,
    value: PropTypes.string,
    path: PropTypes.string,
    options: PropTypes.array,
    rows: PropTypes.number,
    style: PropTypes.object,
    inputStyle: PropTypes.object,
    rest: PropTypes.object,
};

CustomInput.defaultProps = {
    onChange: null,
    type: 'text',
    placeholder: '',
    pointing: 'left',
    size: 'small',
    label: '',
    extraLabel: '',
    extraLabelPointing: 'bottom',
    value: '',
    path: '',
    options: [],
    rows: 6,
    style: {},
    inputStyle: {},
    rest: {},
};

export default CustomInput;