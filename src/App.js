import React from 'react'
import { Formik, FieldArray, Field } from 'formik'
import Additional from './Additional'
import UserItem from './UserItem'

const getUsers = () => {
  const users = JSON.parse(localStorage.getItem('users'))
  return users ? users : [{ name: 'nuttawut chaichuay', age: 28, nickname: 'wut' }]
}

const App = () => (
  <Formik
    initialValues={{ users: getUsers() }}
    render={({ values }) => {

      // Manual save form values into localStorage ///////////////////////////////////
      localStorage.setItem('users', JSON.stringify(values.users))

      return (
        <form className="user-form table-style" autoComplete="off">
          <div className="form-header">
            <div className="col">Name</div>
            <div className="col">Age</div>
            <div className="col">Nickname</div>
            <div className="col">Action</div>
          </div>
          <div className="form-body">
            <FieldArray
              name="users"
              render={arrayHelpers => {
                const isHaveData = Boolean(values.users.length)
                return (
                  <>
                    {
                      isHaveData ? (
                        <div className="user-lists">
                          {values.users.map((user, index) => (
                            <Field
                              key={user.nickname}
                              name={`users.${index}`}
                              component={UserItem}
                              onDeleted={() => {
                                arrayHelpers.remove(index)
                              }}
                            />
                          ))}
                        </div>
                      ) : <div className="no-info">-- No Information --</div>
                    }
                    <Additional helper={arrayHelpers} />
                  </>
                )
              }}
            />
          </div>
        </form>
      )
    }}
  />
)

export default App
