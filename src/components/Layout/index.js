import React from 'react'

export const FullContent = props => (
  <div className="row">
    <div className="col-xs-12">
      <main>{props.children}</main>
    </div>
  </div>
)

export const SplitContent = props => (
  <div className="row">
    <div className="col-sm-2">{props.navigation}</div>
    <div className="col-sm-10">{props.children}</div>
  </div>
)
