<h1 align="center">JSON-BLOG V2</h1>

[V1](https://github.com/4min-dev/JSON-BLOG-V1)
[V2](https://github.com/4min-dev/JSON-BLOG-V2)

<h2 align="center">RU | Обновлённая версия проекта JSON-BLOG.</h2>

<h2 align="center">Что нового?</h2>

- Перестроен подход к разработке, добавлен backend к вебсайту, благодаря чему V2 JSON-BLOG является full-stack приложением;
- Использованы новые подходы к оптимизации вебсайта;
- Использован дополнительный стек технологий;
- К каждому компоненту выделен отдельный CSS файл для более удобной и гибкой настройки ( раньше был один main.css файл, в котором присутствовал CSS код всех компонентов );
- Глубоко переработан способ загрузки изображений через input type="file", теперь данный компонент можно удобно визуально настраивать, а так же присутствует типизация разрешенных типов файлов, и логика по обработке изображений;
- Теперь в приложении присутствует глобальный переиспользуемый компонент <Notifications/>, позволяющий выводить на экран уведомления об операциях;
- Разработаны дополнительные хуки, переработаны старые хуки;
- Теперь автормзация пользователей, включая их регистрацию происходит в полной связке с сервером, работа с постами, альбомами, списком дел происходит так же в связке с сервером;
- На сервере присутствует поддержка cookie-parser для удобной авторизации пользователей и работе с куки;
- Так же на сервере происходит дополнительная обработка изображений для их последующей выгрузки на импровизированное удаленное хранилище (Изображения сохраняются в папку uploads корневой директории проекта, доступ к изображениям так же возможен через соответствующую URL строку - http://localhost:3000/uploads/imagename (Порт и хост можно менять через переменные окружения);

<h2 align="center">Технологический стек, используемый в проекте:</h2>

- HTML;
- CSS;
- JS;
- TS;
- React;
- React-router;
- Redux (RTK, RTK-Query);
- Node.JS;
- Express.JS;
- MongoDB;
- Mongoose;
- Multer;
- Cookie-parser.

  <hr/>

  <h2 align="center">EN | Updated version JSON-BLOG.</h2>

<h2 align="center">Whats new?</h2>

- Reorganized development approach, added backend to the website, making V2 JSON-BLOG a full-stack application;
- New approaches to website optimization were used;
- Additional technology stack is used;
- Each component has a separate CSS file for more convenient and flexible customization (previously there was one main.css file, which contained CSS code of all components);
- Deeply redesigned the method of loading images via input type=“file”, now this component can be conveniently visually configured, as well as there is typing of allowed file types, and the logic of image processing;
- Now the application has a global reusable component <Notifications/>, which allows to display notifications about operations;
- Additional hooks have been developed and old hooks have been reworked;
- Now user authorization, including their registration is in full connection with the server, work with posts, albums, to-do list is also in connection with the server;
- The server supports cookie-parser for convenient authorization of users and work with cookies;
- Also on the server there is additional processing of images for their subsequent uploading to an improvised remote storage (Images are saved in the uploads folder of the root directory of the project, access to images is also possible through the appropriate URL string - http://localhost:3000/uploads/imagename (Port and host can be changed through environment variables);

<h2 align="center">Technology stack:</h2>

- HTML;
- CSS;
- JS;
- TS;
- React;
- React-router;
- Redux (RTK, RTK-Query);
- Node.JS;
- Express.JS;
- MongoDB;
- Mongoose;
- Multer;
- Cookie-parser.
