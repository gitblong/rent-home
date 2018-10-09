/**
 * Created by chenqilong on 2018/9/29.
 */
import React, { Component } from 'react';

import CreatableSelect from 'react-select/lib/Creatable';

const components = {
    DropdownIndicator: null,
};

const createOption = (label: string) => ({
    label,
    value: label,
});

export default class CreatableInputOnly extends Component<*, State> {
    state = {
        inputValue: '',
        value: [],
    };
    handleChange = (value: any, actionMeta: any) => {
        console.group('Value Changed');
        console.log(value);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        this.setState({ value });
    };
    handleInputChange = (inputValue: string) => {

        this.setState({ inputValue:inputValue });
    };
    handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
        const { inputValue, value } = this.state;
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
                console.group('Value Added');
                console.log(inputValue,value);
                console.groupEnd();
                this.setState({
                    inputValue: '',
                    value: [...value, createOption(inputValue)],
                });
                event.preventDefault();
            case 'Tab':
                console.group('Value Added');
                console.log(value);
                console.groupEnd();
                this.setState({
                    inputValue: '',
                    value: [...value, createOption(inputValue)],
                });
                event.preventDefault();
        }
    };
    render() {
        const { inputValue, value } = this.state;
        return (
            <CreatableSelect
                components={components}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                placeholder="输入内容并按回车,输入格式为  [押金名称]:[抵押金额]元;"
                value={value}
            />
        );
    }
}