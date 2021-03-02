import React, { Fragment, useState, useEffect } from 'react'
import * as serviceWorkerRegistration from '../serviceWorkerRegistration'

function ServiceWorker() {
  const [showReload, setShowReload] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState(null)

  const onSWUpdate = registration => {
    setShowReload(true)
    setWaitingWorker(registration.waiting)
  }

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onSWUpdate })
  }, [])

  const reloadPage = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
    }
    setShowReload(false)
    window.location.reload(true)
  }

  return (
    <Fragment>
      {showReload && (
        <div
          className="cursor-pointer alert alert-warning text-center fixed-top py-4"
          role="alert"
          onClick={reloadPage}>
          AGGIORNAMENTO DISPONIBILE
        </div>
      )}
    </Fragment>
  )
}

export default ServiceWorker
