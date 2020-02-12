import React from "react";
import "./App.scss";

const App = () => {
  return (
    <>
      <header className="header">
        <section className="text">
          <h1 className="h1">Hey, Baby!</h1>
          <h2 className="h2">I am Johnny Bravo, the one-man army!</h2>
        </section>
      </header>
      <main className="main">
        <blockquote
          className="blockquote"
          cite="https://en.wikipedia.org/wiki/Johnny_Bravo"
        >
          <span>
            "When Johnny Bravo first came out, I don't think a lot of people
            didn't have high hopes for it, and I think it was really cool that
            prove exactly what kind of character he was. No one really thought
            it was going to go anywhere. Not only has it gone somewhere, it's
            actually still around, it's very iconic now, 15, 16 years later."
          </span>
          <cite className="cite">
            <strong>&#45;&#45;Writer/Director:</strong>{" "}
            <a
              href="https://en.wikipedia.org/wiki/Butch_Hartman"
              target="_blank"
              rel="noopener noreferrer"
            >
              Butch Hartman
            </a>
          </cite>
        </blockquote>
      </main>
    </>
  );
};

export default App;
