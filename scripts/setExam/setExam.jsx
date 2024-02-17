import React, { useState } from 'react';
import axios from 'axios';

const SetExam = () => {
    const [keyword, setKeyword] = useState('');
    const [keywords, setKeywords] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [marks, setMarks] = useState('');
    const [image, setImage] = useState(null);
    const [blobImage, setBlobImage] = useState(null);

    const formData = new FormData();
    const handleInputChange = (event) => {
        const inputKeyword = event.target.value.trim();
        setKeyword(inputKeyword);
        formData.set('keywords', inputKeyword);
    };
  
    const handleAddKeyword = () => {
        if (keyword) {
            setKeywords((prevKeywords) =>
                prevKeywords ? `${prevKeywords}, ${keyword}` : keyword
            );
            setKeyword('');

            // Use the latest keywords state to update the FormData object
            formData.set('keywords', keywords);
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
      
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageFile = event.target.result;
            setBlobImage(imageFile);
        };
        reader.readAsDataURL(selectedImage);
    };

    const handleSaveExam = () => {
        const formDataObject = {
            question: question,
            answer: answer,
            keywords: keywords,
            marks: marks,
            image: blobImage,
        };

        console.log(formDataObject);

        // Send a POST request to the backend server on port 8000
        axios
            .post('http://localhost:8000/saveExam', JSON.stringify(formDataObject), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                // Handle the response from the server if needed
                console.log('Exam data saved successfully:', response.data);
                document.getElementById('message').innerHTML = 'Exam data saved successfully';
                document.getElementById('message').style.color = 'green';
                // Clear values of all elements
                window.location.reload();
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error saving exam data:', error);
                document.getElementById('message').innerHTML = 'Error saving exam data';
                document.getElementById('message').style.color = 'red';
            });
        
        // Move this line inside the reader.onload event
        // reader.readAsArrayBuffer(imageFile);
    };

    return (
        <div className="center">
            <textarea 
                placeholder="Type your Question here" 
                name="question" 
                rows="10" 
                cols="60"
                required 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            ></textarea><br />
            <p>If you have an image related to the question, please insert it here</p>
            <input 
                type="file"
                name="question_image"
                placeholder="If you have an image, insert it here"
                accept="image/*"
                onChange={handleImageChange}
            ></input><br />
            <textarea 
                placeholder="Type your Answer here" 
                name="answer" 
                rows="10" 
                cols="60"
                required 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            ></textarea><br />

            <textarea 
                placeholder="Type Keywords below and Click Add KeyWord button" 
                disabled 
                name="keywords" 
                rows="5" 
                cols="60"
                value={keywords}
            ></textarea><br />
            
            <input 
                type="text" 
                placeholder="Key words" 
                name="keywords1" 
                value={keyword}
                onChange={handleInputChange}
                required
            ></input>

            <button 
                type="button" 
                name="Add_Keyword" 
                onClick={handleAddKeyword}
            >Add Keyword</button><br />
            <input 
                type="number" 
                placeholder="Marks" 
                name="marks" 
                required 
                onChange={(e) => setMarks(e.target.value)}
            ></input><br />
            <button name="Submit" onClick={handleSaveExam}>Save</button>
            <p id="message"></p>
        </div>
    );
};

export default SetExam;
