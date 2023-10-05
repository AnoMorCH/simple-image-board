# <div align="center">The Simple Image Board</div>

The project is <strong>a simple implementation of a standard image board</strong> where you can share your opinion about a certain topic with other people anonymously (without images, alas). A dump analog of popular web projects like <a link="4chan.org">4chan</a>, <a link="https://iichan.hk/">iichan</a> etc. Made as a part of my study at SPBSTU, Russia.

## Structure

The project is divided in three parts: <strong>browser</strong>, <strong>back-end</strong> and <strong>mobile</strong>. Communication is implemented using API requests between front-end and back-end. Let's talk about each of them more profoundly. 

### 1. browser

A <strong>front-end part</strong> of the project. Is built upon <a link="https://github.com/parcel-bundler/parcel">Parcel</a>. Uses HTML, CSS, native JS and <a link="https://github.com/yegor256/tacit">Tacit</a> as a classless CSS.

#### Hints

<a name="browser-hints-clause-1"></a>
1. To <strong>run the app</strong> locally use
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

Use the [clause 1](#browser-hints-clause-1) to run the app.

3. Also, running the app directly like this

```bash
npx parcel browser/src/*.html
```

can cause unexpected behavior.

Use the [clause 1](#browser-hints-clause-1) to run the app.

4. The <strong>logical architecture of JS files</strong> is the following (all JS files are located inside of `browser/src/js`):

```
classes - classes which are used to store inner logic
consts - constants and storage of front-end urls
controllers - used to change data of the HTML files
helper - small additional functions which aren't suitable to store as classes
import - import of some npm plugins which aren't uploaded automatically
```

### 2. back-end

A <strong>back-end part</strong> of the project. Is built upon <a link="https://docs.oracle.com/javaee/5/tutorial/doc/bnafe.html">Java Servlet</a>. The architecture is close to <a link="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller">the MVC paradigm</a> (only without models, though).

#### Hints

1. The <strong>logical architecture</strong> is the following:

```
[controllers]
back-end/servlets/src/main/java/com/servlets

[additional]
back-end/servlets/src/main/java/com/enums - storage for enums
back-end/servlets/src/main/java/com/classes - storage for classes
back-end/servlets/src/main/webapp/WEB-INF/web.xml - storage for urls
```

It is important to note that `[controllers]` are used to give a response to the server when `[additional]` stores only support functionality for `[controllers]`. In other words, all the internal logic is in `[additional]`.

2. Sometimes communication between the front-end and the back-end is disturbed because of CORS. In such a case the following should be done:

* Check if CORS allowed inside of `back-end/servlets/src/main/webapp/WEB-INF/web.xml`.
* Install <a href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf">an app which allows using CORS</a> on your browser (a common problem for localhost development).

3. Authentication is implemented using <a href="https://jwt.io/">JSON Web Tokens</a>. The implementation is done within of `back-end/servlets/src/main/java/com/classes/JJWT.java`. A nickname is used as the key-value pair which is stored inside of the token. The token is located inside of cookie.