import React from "react";
import DateTimeDisplay from "@/components/DateTime";
import MeetingTypeList from "@/components/MeetingTypeList";
const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="w-full h-[300px] bg-hero bg-cover rounded-[20px]">
        {/* Banner of task and time */}
        <div className="flex flex-col h-full justify-between max-md:py-8 max-md:px-5 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at : 12:00 PM
          </h2>
          <DateTimeDisplay />
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
