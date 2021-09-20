// ./code/edit.js
export const editName = (eleId, name) => {
  document.querySelector(`#${eleId}`).innerHTML = name
}
