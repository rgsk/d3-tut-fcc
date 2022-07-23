import styles from "./CssPrac.module.scss";
const CssPrac = () => {
  return (
    <div className={styles.container}>
      <Example1 />
      <Example2 />
      <Example3 />
      <Example4 />
    </div>
  );
};
export default CssPrac;
const Example1 = () => {
  return (
    <div className={styles.ex1}>
      <div className={styles.block}></div>
      <div className={styles.block}>
        <h1> h1 </h1>
      </div>
      <div className={styles.block}>
        <p> p in block</p>
      </div>
      <div className={styles.block}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </div>
      <p>hiii</p>
      <h1>hiii</h1>
      <h5>hiii</h5>
      <h3>hiii 123</h3>
      <h4>hello</h4>
    </div>
  );
};
const Example2 = () => {
  return (
    <div
      style={{
        height: 200,
        width: 200,
        display: "grid",
        border: "2px solid purple",
        placeContent: "center",
      }}
    >
      <p style={{ border: "1px solid red" }}>fsdfds</p>
    </div>
  );
};
const Example3 = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 70px)",
        gridAutoColumns: 35,
        gridTemplateRows: "repeat(4, 90px)",
        border: "1px solid green",
      }}
    >
      <div
        style={{
          gridColumn: "2/4",
          gridRow: "-3/-5",
          background: "blue",
          color: "white",
        }}
      >
        Rahul
      </div>
      <div
        style={{
          gridColumn: "4",
          gridRow: "-3/-2",
          background: "orange",
        }}
      ></div>
    </div>
  );
};
const Example4 = () => {
  return (
    <div>
      <section className="container">
        <div className="item-a">item-a</div>
        <div className="item-b">item-b</div>
        <div className="item-c">item-c</div>
        <div className="item-d">item-d</div>
        {/* <div className="item-e">item-e</div>
        <div className="item-e">item-f</div>
        <div className="item-e">item-g</div> */}
        <div className="item-e">item-h</div>
      </section>
    </div>
  );
};
