const popup = document.querySelector('.popup'); //ищем в DOMe сам попап
const editButton = document.querySelector('.profile__edit-button'); //ищем кнопку "редактировать"
const closeButton = document.querySelector('.popup__close-button'); //ищем кнопку "закрыть"
const form = document.forms.editForm; //ищем форму по имени "name"
const nameInput = form.elements.name; //ищем инпут с именем "occupation"
const occupationInput = form.elements.occupation; //ищем инпут с работой
const profileName = document.querySelector('.profile__name'); // создает еще одно переменную, которой находим непосредственно имя, укащанное в профиле. 
const profileOccupation = document.querySelector('.profile__occupation');

function editProfile() { //функция, которая добавляет класс к попапу и, тем самым, делает попап видимым. Фокусы на грани магии. 
    popup.classList.add('popup_opened'); 
    nameInput.value = profileName.textContent;
    occupationInput.value = profileOccupation.textContent;
}

function closePopup() { //функция, которая убирает класс из попапа. По умолчанию у всех кнопок тип "submit", поэтому нажатие на кнопку автоматически отправляет форму. Если прописать кнопке тип кнопки, то она станет просто кнопкой, и никаких других функций не потребуется. 
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', editProfile); //добавляем кнопке "редактировать" слушатель, который по клику на кнопку вызовет функцию
closeButton.addEventListener('click', closePopup); //добавляем кнопке "закрыть" слушатель, который по клику на кнопку вызовет функцию

function formSubmitHandler (evt) { //функция сохраняет данные и изменяет имя и занятие пользователся
    evt.preventDefault(evt); // предотвращение стандартного события 
    profileName.textContent = nameInput.value; ; //меняем текст второй переменной на значение, полученное первой переменной. 
    profileOccupation.textContent = occupationInput.value; 

    closePopup(); //вызываем функцию закрытия попапа. 
}

form.addEventListener('submit', formSubmitHandler); //эвентлисенер на форму. Лисенер слушаент, не отправлена ли форма, и запускает функцию. 