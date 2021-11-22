export default function Home(props) {
  return (
    <div>
      <>
        {props.ssrWorking ? (
          <div>
            <h2>
              Deployment Successful of Nextjs Application with SSR on Firebase
            </h2>
          </div>
        ) : (
          <h2>SSR not working</h2>
        )}
      </>
    </div>
  );
}
export async function getServerSideProps() {
  return { props: { ssrWorking: true } };
}
