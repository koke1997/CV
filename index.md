---
layout: default
---

# Ivan Kokalovic

Welcome to my landing page! Here you can find my resume and learn more about me.

[Download my resume](IvanKokalovicResume_v3.pdf)

I am Ivan Kokalovic, a software developer with experience in Python and other programming languages. I have worked on various projects and have a strong background in software development and engineering.

<div id="root"></div>

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="linkedin-profile">
                <iframe src="https://www.linkedin.com/in/kokalovic/" width="100%" height="500" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </div>
</div>

<script src="https://unpkg.com/react/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/babel-standalone/babel.min.js"></script>
<script type="text/babel">
    const { useState } = React;
    const { Document, Page } = window['react-pdf'];

    function App() {
        const [numPages, setNumPages] = useState(null);
        const [pageNumber, setPageNumber] = useState(1);

        function onDocumentLoadSuccess({ numPages }) {
            setNumPages(numPages);
        }

        return (
            <div>
                <header>
                    <h1>Ivan Kokalovic Resume</h1>
                </header>
                <main>
                    <Document
                        file="IvanKokalovicResume_v3.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </main>
            </div>
        );
    }

    ReactDOM.render(<App />, document.getElementById('root'));
</script>
