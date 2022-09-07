let popup = document.querySelector('.popup'); //ищем в DOMe сам попап
let editButton = document.querySelector('.profile__edit-button'); //ищем кнопку "редактировать"
let closeButton = document.querySelector('.popup__close-button'); //ищем кнопку "закрыть"

function editProfile() { //функция, которая добавляет класс к попапу и, тем самым, делает попап видимым. Фокусы на грани магии. 
    popup.classList.add('popup_opened'); 
}

function closePopup(evt) { //функция, которая убирает класс из попапа. Также здесь прописыаем функцию, предотвращающую стандартные события (т.е. перезагрузку страницы)
    evt.preventDefault(evt);
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', editProfile); //добавляем копке "редактировать" слушатель, который по клику на кнопку вызовет функцию
closeButton.addEventListener('click', closePopup); //добавляем копке "закрыть" слушатель, который по клику на кнопку вызовет функцию

let nameInput = document.querySelector('.popup__form-input-name'); //ищем инпут с именем
let occupationInput = document.querySelector('.popup__form-input-occupation'); //ищем инпут с работой
let saveButton = document.querySelector('.popup__save-button'); //ищем кнопку "сохранить"


function formSubmitHandler (evt) { //функция сохраняет данные и изменяет имя и занятие пользователся
    evt.preventDefault(evt); // предотвращение стандартного события 

    let newProfileName = nameInput.value;  //создаем переменную, которой присваиваем значение того, что было введено в инпут. 
    let profileName = document.querySelector('.profile__name'); // создает еще одно переменную, которой находим непосредственно имя, укащанное в профиле. 
    profileName.textContent = newProfileName; //меняем текст второй переменной на значение, полученное первой переменной. 

    let newProfileOccupation = occupationInput.value; //проделываем все то же самое с работой. 
    let profileOccupation = document.querySelector('.profile__occupation');
    profileOccupation.textContent = newProfileOccupation; 

    closePopup(evt); //вызываем функцию закрытия попапа. 
}

saveButton.addEventListener('click', formSubmitHandler); //добавляем слушатель кнопке сохранить. При нажатии будет вызвана функция formSubmitHandler (evt) 