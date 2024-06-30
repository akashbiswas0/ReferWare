// @ts-nocheck
// UserDataProvider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { usePublicKey, useIsInfluencer, useInfluencerData, useBrandData } from "@/store";
import appwriteService from "@/appwrite/config";

const UserDataContext = createContext(null);

export const useUserData = () => {
  return useContext(UserDataContext);
};

const UserDataProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserExist = async (key) => {
      try {
        const data = await appwriteService.getCurrentUser();
        setUser(data);
        setIsAuthenticated(true);
        return data;
      } catch (error) {
        console.log("Error logging in:", error);
      }
    };

    const checkUserSetup = async (key) => {
      const brandData = await appwriteService.getBrandData(key);
      if (brandData.total) {
        console.log("Brand data:", brandData);
        useIsInfluencer.setState({
          isInfluencer: false,
        });
        useBrandData.setState({
          documentId: brandData.documents[0].$id,
          key: brandData.documents[0].key,
          name: brandData.documents[0].name,
          description: brandData.documents[0].description,
          website: brandData.documents[0].website,
          address: brandData.documents[0].address,
          business_reg_code: brandData.documents[0].business_reg_code,
          links: brandData.documents[0].links,
          ecommerce_platform: brandData.documents[0].ecommerce_platform,
          api_key: brandData.documents[0].api_key,
          industry: brandData.documents[0].industry,
          profile_img: brandData.documents[0].profile_img,
          connections: brandData.documents[0].connections,
        });
      }

      const influencerData = await appwriteService.getInfluencerData(key);
      if (influencerData.total) {
        console.log("Influencer data:", influencerData);
        useIsInfluencer.setState({
          isInfluencer: true,
        });
        useInfluencerData.setState({
          documentId: influencerData.documents[0].$id,
          key: influencerData.documents[0].key,
          name: influencerData.documents[0].name,
          bio: influencerData.documents[0].bio,
          links: influencerData.documents[0].links,
          niche: influencerData.documents[0].niche,
          main_platform: influencerData.documents[0].main_platform,
          follower_count: influencerData.documents[0].follower_count,
          connections: influencerData.documents[0].connections,
        });
      }
    };

    if (isAuthenticated) {
      console.log("User payload data:", user?.email);
      usePublicKey.setState({ publicKey: user?.email });
      const key = usePublicKey.getState().publicKey;
      console.log("Key being added:", key);
      checkUserExist(key);
      checkUserSetup(key);
    }
  }, [isAuthenticated]);

  return (
    <UserDataContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;