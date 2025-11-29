import { ToastBar, Toaster } from 'react-hot-toast'

const ToastWrapper = () => {
  return (
    <Toaster
      toastOptions={{ duration: 8000 }}
      position='bottom-left'
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}

export default ToastWrapper
