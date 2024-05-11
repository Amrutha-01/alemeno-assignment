import React from "react";
import SignIn from "./SignIn";
import Signup from "./Signup";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const AuthPage = () => {
  
  return (
    <div className="flex justify-center items-center mt-36">
      <Tabs className="bg-black text-white h-80 w-2/5 sm:w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <TabList>
          <Tab>Sign Up</Tab>
          <Tab>Sign In</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Signup/>
          </TabPanel>
          <TabPanel>
            <SignIn/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AuthPage;
