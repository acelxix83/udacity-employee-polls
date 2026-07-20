import PollList from "./PollList";

const Home = () => {
  return (
    <div>
      <PollList showAnsweredQuestions={false} />
      <PollList showAnsweredQuestions={true} />
    </div>
  );
};

export default Home;
