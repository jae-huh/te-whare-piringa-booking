import React from 'react'

class Settings extends React.Component {

  render () {
    return (
      <div>
        <h2>Settings</h2>
        <form>
          <p>
            Email Address<input type="text" />
          </p>
          <button>Change</button>
        </form>
      </div>
    )
  }
}

export default Settings
