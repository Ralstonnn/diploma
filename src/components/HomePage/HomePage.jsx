import { useEffect, useState } from "react";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";
import "./style.scss";

export function HomePage() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/get-user-data")
      .then((resp) => resp.json())
      .then((res) => {
        setUserData(res);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="home-page-component flex-item flex-item-1 flex flex-wrap">
      <div className="flex-item flex-item-500-1 flex flex-wrap">
        <div className="flex-item flex-item-1 text-color-main-sd">Name:</div>
        <div className="flex-item flex-item-1 text-s3">{userData.name}</div>
        <div className="flex-item flex-item-1 text-color-main-sd m-t-20">
          Surname:
        </div>
        <div className="flex-item flex-item-1 text-s3">{userData.surname}</div>
      </div>
      <div className="flex-item flex-item-500-1 m-500-t-20">
        <div className="flex-item flex-item-1">
          Words: {userData.wordsCount}
        </div>
        <div className="flex-item flex-item-1 m-t-10">
          Words to "Learn": {userData.toLearn}
        </div>
        <div className="flex-item flex-item-1 m-t-10">
          Words to "Repeat": {userData.toRepeat}
        </div>
        <div className="flex-item flex-item-1 m-t-10">
          Words to "Spell Check": {userData.toSpellcheck}
        </div>
        <div className="flex-item flex-item-1 m-t-10">
          Words to "Choose Word": {userData.toChooseWord}
        </div>
      </div>
    </div>
  );
}
