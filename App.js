import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleSignIn = () => {
    const user = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setIsSignedIn(true);
    } else {
      alert("Invalid email or password");
    }
  };

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      alert('INVALID: All fields must be filled');
      return;
    }

    if (password !== confirmPassword) {
      alert('INVALID: Passwords do not match');
      return;
    }

    setRegisteredUsers([...registeredUsers, { email, password }]);
    alert('User Registered Successfully');
    setShowSignUp(false);
  };

  const [donors, setDonors] = useState([
    {
      name: "Saykot Khandakar",
      age: 23,
      weight: 70,
      sex: "Male",
      bloodGroup: "AB+",
      mobileNo: "01934567890",
      lastDonationDate: "2024-08-01",
      location: "Sher-E-Bangla, Rahat Anowar",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      backgroundColor: "#e0f7fa"
    },
    {
      name: "Farjana Mim",
      age: 22,
      weight: 52,
      sex: "Female",
      bloodGroup: "A+",
      mobileNo: "0187654321",
      lastDonationDate: "2024-07-15",
      location: "Rahat Anowar Hospital, Popular Diagonistic Center",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      backgroundColor: "#fce4ec"
    },
    {
      name: "Faizullah Khan",
      age: 23,
      weight: 55,
      sex: "Male",
      bloodGroup: "O-",
      mobileNo: "0178901234",
      lastDonationDate: "2024-08-10",
      location: "Sadar Hospital, Islamia Hospital",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
      backgroundColor: "#d1c4e9"
    },
    {
      name: "Pryanka Kundu",
      age: 22,
      weight: 55,
      sex: "Female",
      bloodGroup: "B+",
      mobileNo: "01622334455",
      lastDonationDate: "2024-08-05",
      location: "Islamia Hospital, Sher-E-Bangla",
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
      backgroundColor: "#fff9c4"
    },
  ]);

  const filteredDonors = donors.filter(donor =>
    donor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isSignedIn ? (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to BloodDonation App</Text>
          </View>

          {/* Location Search Section */}
          <View style={styles.searchSection}>
            <Text style={styles.header}>Search for Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter location..."
              placeholderTextColor="#333"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          {/* Donor Profiles Section */}
          <View style={styles.profilesContainer}>
            {filteredDonors.map((donor, index) => (
              <DonorProfile
                key={index}
                name={donor.name}
                age={donor.age}
                weight={donor.weight}
                sex={donor.sex}
                bloodGroup={donor.bloodGroup}
                mobileNo={donor.mobileNo}
                lastDonationDate={donor.lastDonationDate}
                location={donor.location}
                profileNumber={index + 1}
                backgroundColor={donor.backgroundColor}
                profileImage={donor.profileImage}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setIsSignedIn(false)}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        showSignUp ? (
          <Register 
            onSignUp={handleSignUp}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            onSignIn={() => setShowSignUp(false)} 
          />
        ) : (
          <SignIn 
            onSignIn={handleSignIn}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onSignUp={() => setShowSignUp(true)}
          />
        )
      )}
    </ScrollView>
  );
}

const DonorProfile = ({ name, age, weight, sex, bloodGroup, mobileNo, lastDonationDate, location, profileNumber, backgroundColor, profileImage }) => (
  <View style={[styles.profileSection, { backgroundColor }]} >
    <Text style={styles.header}>Donor Profile-{profileNumber}</Text>
    <Image
      source={{ uri: profileImage }}
      style={styles.profileImage}
    />
    <View style={styles.profileDetails}>
      <Text style={styles.info}>Name: {name}</Text>
      <Text style={styles.info}>Age: {age}</Text>
      <Text style={styles.info}>Weight: {weight} kg</Text>
      <Text style={styles.info}>Sex: {sex}</Text>
      <Text style={styles.info}>Blood Group: {bloodGroup}</Text>
      <Text style={styles.info}>Mobile No: {mobileNo}</Text>
      <Text style={styles.info}>Last Donation Date: {lastDonationDate}</Text>
      <Text style={styles.info}>Location Tags: {location}</Text>
    </View>
  </View>
);

const SignIn = ({ onSignIn, email, password, setEmail, setPassword, onSignUp }) => (
  <View style={styles.authContainer}>
    <Text style={styles.title}>Sign In</Text>
    <TextInput
      style={styles.input}
      placeholder="Email"
      placeholderTextColor="#007BFF"
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      placeholderTextColor="#007BFF"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <Button title="Sign In" onPress={onSignIn} color="#28a745" />
    <TouchableOpacity onPress={onSignUp}>
      <Text style={styles.authSwitchText}>Don't have an account? Sign Up</Text>
    </TouchableOpacity>
  </View>
);

const Register = ({ onSignUp, email, password, confirmPassword, setEmail, setPassword, setConfirmPassword, onSignIn }) => (
  <View style={styles.authContainer}>
    <Text style={styles.title}>Register</Text>
    <TextInput
      style={styles.input}
      placeholder="Email"
      placeholderTextColor="#007BFF"
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      placeholderTextColor="#007BFF"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <TextInput
      style={styles.input}
      placeholder="Confirm Password"
      placeholderTextColor="#007BFF"
      secureTextEntry
      value={confirmPassword}
      onChangeText={setConfirmPassword}
    />
    <Button title="Sign Up" onPress={onSignUp} color="#28a745" />
    <TouchableOpacity onPress={onSignIn}>
      <Text style={styles.authSwitchText}>Already have an account? Sign In</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  titleContainer: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
  },
  searchSection: {
    marginBottom: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilesContainer: {
    marginTop: 20,
  },
  profileSection: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileDetails: {
    marginLeft: 15,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  authSwitchText: {
    marginTop: 10,
    color: '#007BFF',
    textAlign: 'center',
  },
});
