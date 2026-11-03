// Реестр книг серии: из него движок строит вкладки навигации и считает медали.
// total — число вопросов в банке questions/<id>.js; обновляйте при наполнении банка.
// icon — тематическая иконка медали (SVG-пути, вид 24×24, контур).
window.QUIZ_SERIES=[
 {id:'hp1',tab:'Философский камень',url:'harry-potter-1.html',total:117,icon:'<path d="m3 11 5-6h8l5 6-9 9zM3 11h18m-13-6 4 15 4-15"/>'},
 {id:'hp2',tab:'Тайная комната',url:'harry-potter-2.html',total:120,icon:'<path d="M6 3h12v18H6zM9 3v18"/><path d="M13 8l2.5 5L13 11.5 10.5 13z"/>'},
 {id:'hp3',tab:'узник Азкабана',url:'harry-potter-3.html',total:131,icon:'<path d="M6 3h12l-6 9 6 9H6l6-9z"/>'},
 {id:'hp4',tab:'Кубок огня',url:'harry-potter-4.html',total:148,icon:'<path d="M7 4h10l-1.6 7a3.5 3.5 0 0 1-6.8 0zM12 15.5V19m-4 2h8"/><path d="M12 4c.4-1.2 1.8-1.6 1-3"/>'},
 {id:'hp5',tab:'Орден Феникса',url:'harry-potter-5.html',total:152,icon:'<path d="M12 21V9m0 0c-2-1-4.5-3.5-5.5-6C9.5 3.5 11 5.5 12 7c1-1.5 3-3.5 5.5-4C16.5 5.5 14 8 12 9zM8 21h8"/>'},
 {id:'hp6',tab:'Принц-полукровка',url:'harry-potter-6.html',total:180,icon:'<path d="M10 3h4m-2 0v4L7.5 16a3 3 0 0 0 2.7 4.5h4A3 3 0 0 0 16.5 16L12 7V3"/><path d="M8.5 15h7"/>'},
 {id:'hp7',tab:'Дары Смерти',url:'harry-potter-7.html',total:216,icon:'<path d="M12 4 3.5 20h17z"/><circle cx="12" cy="14" r="3.4"/><path d="M12 4v16"/>'}
];
