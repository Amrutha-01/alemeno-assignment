import { useEffect,useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import firestore from '../firebase/firebase';
import { auth } from '../firebase/firebase';

export const GetStudentData = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const q = query(collection(firestore, 'students'), where('id', '==', userId));

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const studentInfo = querySnapshot.docs[0].data();
            console.log('Student Data:', studentInfo);
            setStudentData(studentInfo)
          } else {
            console.log('No student found for the current user');
          }
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      }
    };

    fetchData();
  }, []);
  return studentData;
};
