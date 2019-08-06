import React from "react";
import {Form} from "antd";

const FormItem = Form.Item;
export const makeField = (Component, formItemLayout) => ({input, meta, children, hasFeedback, label, ...rest}) => {
    console.log(rest);
    const hasError = meta.touched && meta.invalid;
    return (
        <FormItem
            {...formItemLayout}
            label={label}
            validateStatus={hasError ? "error" : "success"}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component {...input} {...rest} children={children}/>
        </FormItem>
    );
};