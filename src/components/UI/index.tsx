//UI theme settings menu for user
"use client";
export default function UI() {
  return (
    <div>
      <ul>
        <li>
          {/*UI theme*/}
          <h1>UI Theme</h1>
          <p>Choose any UI theme you want</p>
          <div></div>
        </li>
        <li>
          {/*Background Change*/}
          <h1>Background Change</h1>
          <p>Choose images or use your own for board background</p>
          <div></div>
        </li>
        <li>
          {/*Columns*/}
          <h1>Columns</h1>
          <p>Choose any colums from 1 to 6</p>
          <div></div>
        </li>

        <li>
          {/*List density*/}
          <h1>List Density</h1>
          <p>Choose any list density you want</p>
          <div></div>
        </li>
      </ul>
      <div>
        <button>Reset</button>
        <button>Save</button>
      </div>
    </div>
  );
}
