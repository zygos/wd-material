export default errorContainer => ({
  displayError: error => {
    console.error(error)
    errorContainer.innerText = error.message
  },
  clearError: () => {
    errorContainer.innerText = ''
  },
})
