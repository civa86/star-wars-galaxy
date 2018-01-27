import React from 'react'
import Switch from 'react-switch'
import StarWarsIcon from '../StarWarsIcon'

const ForceSideSwitch = props => (
  <label className="pull-right" htmlFor="force-side-switch">
    <span className="sr-only">Switch to change Force Side</span>
    <Switch
      checked={props.side && props.side === 'dark'}
      onChange={() => {
        const changeSide = props.side === 'light' ? 'dark' : 'light'
        return props.changeForceSide(changeSide)
      }}
      uncheckedIcon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: 35,
            paddingTop: 5,
            color: '#bd4422'
          }}>
          <StarWarsIcon icon="swg-galrep" />
        </div>
      }
      checkedIcon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: 35,
            paddingTop: 5,
            color: '#018acc'
          }}>
          <StarWarsIcon icon="swg-reball" />
        </div>
      }
      offColor="#1a1112"
      onColor="#bba79c"
      offHandleColor="#70787D"
      onHandleColor="#41363A"
      handleDiameter={30}
      height={40}
      width={90}
      className="react-switch"
      id="force-side-switch"
    />
  </label>
)

export default ForceSideSwitch
