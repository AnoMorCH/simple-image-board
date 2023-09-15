# <div align="center">The Simple Image Board</div>

The project is <strong>a simple implementation of a standard image board</strong> where you can share your opinion about a certain topic with other people anonymously (without images, alas). A dump analog of popular web projects like <a link="4chan.org">4chan</a>, <a link="https://iichan.hk/">iichan</a> etc. Made as a part of my study at SPBSTU, Russia.

## Structure

The project is divided in three parts: <strong>browser</strong>, <strong>back-end</strong> and <strong>mobile</strong>. Communication is implemented using API requests between front-end and back-end. Let's talk about each of them more profoundly. 

### 1. Browser

A <strong>front-end part</strong> of the project. Is built upon <a link="https://github.com/parcel-bundler/parcel">Parcel</a>. Uses HTML, CSS and native JS.

#### Hints

1. To run the app locally use
```bash
cd browser
npx parcel src/*.html
```

If there is a mistake, before debugging try to delete `browser/.parcel-cache`, `browser/.cache` and `browser/dist` folders.

2. Please, note that running

```bash
cd browser
npx parcel src/index.html
```

can sometimes to lead to a situation when some pages aren't uploaded in spite of the fact that the command above is commonly used in the docs.

3. Also, running the app directly like this

```bash
npx parcel browser/src/*.html
```

can cause unexpected behavior.
