---
layout: default
---

# Ivan Kokalovic

Welcome to my landing page! Here you can find my resume and learn more about me.

[Download my resume](IvanKokalovicResume_v3.pdf)

I am Ivan Kokalovic, a software developer with experience in Python and other programming languages. I have worked on various projects and have a strong background in software development and engineering.

## About Me

I am a passionate software developer with a strong background in software engineering. I enjoy working on challenging projects and continuously improving my skills.

## Skills

- Python
- JavaScript
- React
- HTML/CSS
- SQL
- Git

## Projects

- Project 1: Description of project 1
- Project 2: Description of project 2
- Project 3: Description of project 3

## Contact

You can reach me at [ivan.kokalovic@example.com](mailto:ivan.kokalovic@example.com)

<div id="root"></div>

<script src="https://unpkg.com/react/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/babel-standalone/babel.min.js"></script>
<script src="https://unpkg.com/react-pdf/dist/umd/react-pdf.js"></script>
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
