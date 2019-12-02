import React, { useState } from 'react'
import classnames from 'classnames'
import './index.scss'

const UserItem = ({ field, form, onDeleted }) => {
  const [value, setValue] = useState({
    name: field.value.name,
    age: field.value.age,
    nickname: field.value.nickname
  })

  const [isEdit, setEdit] = useState(false)

  const onEditToggle = () => {
    setEdit(prevState => !prevState)
  }

  const onChangeValue = (e, fieldName) => {
    e.persist()
    setValue(prevState => ({
      ...prevState,
      [fieldName]: e.target.value
    }))
  }

  const onSave = () => {
    setEdit(false)
    setTimeout(() => {
      form.setFieldValue(field.name, value)
    }, 600)
  }

  const onCancel = () => {
    setValue(field.value)
    setEdit(false)
  }

  return (
    <div className={classnames('user-item', { edit: isEdit })}>
      <div className="col">
        {
          !isEdit ? value.name : (
            <input
              type="text"
              className="name"
              value={value.name}
              name={`${field.name}.name`}
              placeholder="name"
              onChange={e => onChangeValue(e, 'name')}
            />
          )
        }
      </div>
      <div className="col">
        {
          !isEdit ? value.age : (
            <input
              min="10"
              type="number"
              className="age"
              value={value.age || console.log(value.age)}
              name={`${field.name}.age`}
              placeholder="age"
              onChange={e => onChangeValue(e, 'age')}
            />
          )
        }
      </div>
      <div className="col">
        {
          !isEdit ? value.nickname : (
            <input
              className="nickname"
              value={value.nickname}
              name={`${field.name}.nickname`}
              placeholder="nickname"
              onChange={e => onChangeValue(e, 'nickname')}
            />
          )
        }
      </div>
      <div className="col">
        <div className="edit-button" onClick={onEditToggle} />
        <div className="delete-button" onClick={onDeleted} />
        <div className="decision">
          <span className="save-button" onClick={onSave}>Save</span>
          <span className="cancel-button" onClick={onCancel}>Cancel</span>
        </div>
      </div>
    </div>
  )
}

export default UserItem
