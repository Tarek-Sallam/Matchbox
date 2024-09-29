"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import Skill from "@/components/Skill";

export default function Profile() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const URLBase = "http://127.0.0.1:5000";

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      console.log("User ID found in localStorage:", storedUserId);
    }
  }, []);

  //GET request to populate profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching user profile for userId:", userId);
        const userResponse = await fetch(
          `${URLBase}/user/get_profile?uid=${localStorage.getItem("userId")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const Userdata = await userResponse.json();
        const userStringData = JSON.stringify(Userdata);
        setEmail(Userdata.email);
        setFname(Userdata.fname);
        setLname(Userdata.lname);
        console.log(userStringData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // PUT request to update changes
  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // NOTE; PASSWORD MUST BE >= 6 CHARACTERS
    const password = formData.get("password") as string;
    const university = formData.get("university") as string;
    const major = formData.get("major") as string;
    const bio = formData.get("bio") as string;
    const year = parseInt(formData.get("year") as string, 10);
    const skills_to_offer = parseInt(formData.get("year") as string, 10);
    const skills_to_learn = parseInt(formData.get("year") as string, 10);
    const fname = formData.get("fname") as string;
    const lname = formData.get("lname") as string;

    const payload = {
      password,
      university,
      major,
      bio,
      year,
      skills_to_offer,
      skills_to_learn,
      fname,
      lname,
    };

    console.log("Request Payload:", payload);

    const multipartFormData = new FormData();
    const photo = formData.get("photo") as File;

    multipartFormData.append("file", photo);

    Object.keys(payload).forEach((key) => {
      multipartFormData.append(key, (payload as any)[key]);
    });

    const response = await fetch(
      `${URLBase}/user/update_profile?user_id=${localStorage.getItem(
        "userId"
      )}`,
      {
        method: "POST",
        body: multipartFormData,
      }
    );

    console.log(response);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("userId", data.uid); // save user ID in localStorage
      console.log("User updated successfully:", data);
      console.log("User ID:", data.uid);
    } else {
      console.error("Failed to update user");
    }
  };

  return (
    <div className="flex justify-centers items-center flex-col">
      <h1 className="text-4xl mt-[50px] mb-[25]">
        {fname} {lname}
      </h1>
      <div className="w-[80vw]">
        <form
          className="w-full flex justify-centers items-center flex-col gap-5"
          onSubmit={handleEdit}
        >
          <div className=" border-2 border-black rounded-md w-full h-10 flex justify-between items-center ">
            <input
              className="outline-none ml-2"
              type="text"
              id="fname"
              name="fname"
              placeholder={fname}
            />
          </div>
          <div className=" border-2 border-black rounded-md w-full h-10 flex justify-between items-center ">
            <input
              className="outline-none ml-2"
              type="text"
              id="lname"
              name="lname"
              placeholder={lname}
            />
          </div>
          <div className=" border-2 border-black rounded-md w-full h-10 flex justify-between items-center ">
            <input
              className="outline-none ml-2"
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
            />
          </div>
          <div className=" border-2 border-black rounded-md w-full h-10 flex justify-between items-center">
            <input
              className="outline-none ml-2"
              type="number"
              id="year"
              name="year"
              placeholder="1"
            />
          </div>
          <div className=" border-2 border-black rounded-md w-full h-10 flex justify-between items-center">
            <input
              className="outline-none ml-2"
              type="text"
              id="university"
              name="university"
              placeholder="University"
            />
          </div>
          <div className=" border-2 border-black rounded-md w-full h-10 flex justify-between items-center ">
            <input
              className="outline-none ml-2"
              type="text"
              id="major"
              name="major"
              placeholder="Major"
            />
          </div>
          <div className="border-2 border-black rounded-md w-full h-10 flex justify-between items-center">
            <select
              className="outline-none ml-2 w-full h-full"
              id="skills_to_offer"
              name="skills_to_offer"
              multiple
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          <div className="border-2 border-black rounded-md w-full h-10 flex justify-between items-center">
            <select
              className="outline-none ml-2 w-full h-full"
              id="skills_to_learn"
              name="skills_to_learn"
              multiple
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          <div className=" border-2 border-black rounded-md w-full h-[100px] mt-5">
            <input
              className="outline-none ml-2"
              type="text"
              id="bio"
              name="bio"
              placeholder="bio"
            />
          </div>
          <div className=" border-2 border-black rounded-md w-full h-10 flex justify-between items-center ">
            <input
              className="outline-none ml-2"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="w-1/2 rounded-md h-10 bg-gray-300">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
