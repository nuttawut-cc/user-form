import React, { useState } from 'react'
import './index.scss'

const temp = {
  name: '',
  age: '',
  nickname: ''
}

const Additional = ({ helper }) => {
  const [value, setValue] = useState(temp)

  const onChangeValue = (e, fieldName) => {
    e.persist()
    setValue(prevState => ({
      ...prevState,
      [fieldName]: e.target.value
    }))
  }

  const onAddItem = () => {
    let isChange = (
      Object
        .keys(value)
        .find(key => value[key].length)
    )

    if (isChange) {
      helper.push(value)
      setValue(temp)
    }
  }

  const onCancel = () => {
    setValue(temp)
  }

  return (
    <div className="additional">
      <input
        type="text"
        value={value.name}
        placeholder="name"
        onChange={e => onChangeValue(e, 'name')}
      />
      <input
        min="10"
        type="number"
        className="age"
        value={value.age}
        placeholder="age"
        onChange={e => onChangeValue(e, 'age')}
      />
      <input
        type="text"
        value={value.nickname}
        placeholder="nickname"
        onChange={e => onChangeValue(e, 'nickname')}
      />
      <div className="cancel-button" onClick={onCancel}>Cancel</div>
      <div className="add-button" onClick={onAddItem}></div>
    </div>
  )
}

export default Additional
