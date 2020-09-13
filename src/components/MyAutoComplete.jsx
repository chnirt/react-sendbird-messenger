import React, { forwardRef } from 'react'
import { AutoComplete, Input, Empty } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export const MyAutoComplete = forwardRef(
    (
        {
            style,
            options = [],
            value = '',
            onSelect = () => {},
            onSearch = () => {},
            onChange = () => {},
            placeholder = 'Search for people',
        },
        ref
    ) => {
        return (
            <div style={style}>
                <AutoComplete
                    ref={ref}
                    options={options}
                    style={{ width: '100%' }}
                    onSelect={onSelect}
                    onSearch={onSearch}
                    filterOption={(inputValue, option) =>
                        option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    notFoundContent={
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                    allowClear={true}
                    backfill={true}
                    autoFocus={true}
                >
                    <Input
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        prefix={
                            <SearchOutlined
                                style={{
                                    fontSize: 16,
                                    color: '#d9d9d9',
                                }}
                            />
                        }
                    />
                </AutoComplete>
            </div>
        )
    }
)
