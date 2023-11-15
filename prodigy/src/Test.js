import React, { useState, useEffect } from 'react';
let x = 0;

const Prodigy = () => {
  const text = 'This This is my world This is my world This is my world jayanth'; //Initializing value of text
  const [categories] = useState(['Company', 'Location']); //Initializing value of categories
  const [selectedCategory, setSelectedCategory] = useState('Company'); // Selected category value based on mouse selection
  const [words, setWords] = useState([]); //Array - Consists of all the words that were split based on space
  const [selectedWords, setSelectedWords] = useState([]);
  const [lastClicked, setLastClicked] = useState([null]);
  const [selectedWordsArray, setSelectedWordsArray] = useState([]);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // console.log(words);
  

  const toggleWordSelection = (lastClicked, wordId) => { //Triggered when mouseUp
    let updatedSelectedWordsArray = [...selectedWordsArray];
    let updatedCategory;
    let sentence = '';
    
    let selectedWordIds = [];
    
    setWords((prevWords) =>
      prevWords.map((word) => {
        
        if (word.id >= lastClicked && word.id <= wordId) {
          // console.log(x);
          // ++x
          updatedCategory = [...word.category];
          const categoryIndex = updatedCategory.indexOf(selectedCategory);
          
          if (categoryIndex !== -1) {
            updatedCategory.splice(categoryIndex, 1);
          } else {
            updatedCategory.push(selectedCategory);
          }
  
          const updatedWord = {
            ...word,
            isSelected: updatedCategory.length > 0,
            category: updatedCategory,
          };
          // console.log(updatedWord.id);
          
          const wordIndex = updatedSelectedWordsArray.findIndex(
            (selectedWord) => selectedWord[0] === updatedWord.text
          );
          
          if (updatedWord.isSelected) {
            if (wordIndex !== -1) {
              updatedSelectedWordsArray[wordIndex][1] = updatedWord.category.join(', ');
              // updatedSelectedWordsArray[wordIndex][2] = [...updatedSelectedWordsArray[wordIndex][2], ...selectedWordIds];
              // console.log(updatedSelectedWordsArray[wordIndex]);

            } else {
              updatedSelectedWordsArray.push([updatedWord.text, updatedWord.category, selectedWordIds]);
            }
            setSelectedWords((prevSelectedWords) => [...prevSelectedWords, updatedWord]);
            // console.log(updatedWord.text);
            
            sentence = sentence.concat(updatedWord.text, ' ');
            selectedWordIds.push(updatedWord.id);

            // if (!sentence.includes(updatedWord.text)) {
            //   sentence = sentence.concat(updatedWord.text, ' ');
            // }
  
            return updatedWord;
          } else {
            setSelectedWords((prevSelectedWords) =>
              prevSelectedWords.filter((selectedWord) => selectedWord.id !== updatedWord.id)
            );
            if (wordIndex !== -1) {
              updatedSelectedWordsArray.splice(wordIndex, 1);
            }
          }
          return updatedWord;
        } else {
          return word;
        }
        
      })
    );
  
    setSelectedWordsArray((prevSelectedWordsArray) => {
      const trimmedSentence = sentence.trim();
      const wordsArray = trimmedSentence.split(' ');
      const uniqueSelectedWordIds = [...new Set(selectedWordIds)];
      const uniqueWordsArray = [...new Set(wordsArray)];
  
      const existingArrayIndex = prevSelectedWordsArray.findIndex(
        (arr) => arr[0] === uniqueWordsArray.join(' ')
      );
      // console.log(existingArrayIndex);

      if (existingArrayIndex !== -1) {
        prevSelectedWordsArray[existingArrayIndex][1] = updatedCategory;
        prevSelectedWordsArray[existingArrayIndex][2] = uniqueSelectedWordIds;
        console.log(uniqueSelectedWordIds)
        return prevSelectedWordsArray;
      } else {
        return [
          ...prevSelectedWordsArray,
          [words.filter((word) => uniqueSelectedWordIds.includes(word.id)).map((word) => word.text).join(' '), 
          updatedCategory, uniqueSelectedWordIds
          
        ]
        ];      
      }
    });


    
  
    setLastClicked(null);
    
  };


  // Function to recognize words based on offset values
  const recognizeWords = () => {
    const wordsArray = text.split(' ').map((word, index) => ({
      id: index,
      text: word,
      isSelected: false,
      category: [],
    }));
  
    setWords(wordsArray);
  };

  useEffect(() => {
    recognizeWords();
  }, []);

  useEffect(() => {
    console.log(selectedWordsArray);
  }, [lastClicked, selectedWordsArray]);

  return (
    <div>
      <div 
      style={{
        border: '2px solid #000', 
        marginTop:'10px', 
        padding:'10px'}}>
        {categories.map((category) => (
          <span 
          key={category} 
          style={{
            fontSize:'25px',
            border: '2px solid #000', 
            marginRight:'5px',
            padding:'5px', }}>
            <input
              type='radio'
              name='category'
              value={category}
              checked={selectedCategory === category}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </span>
        ))}
      </div>
      <div>
        {words.map((word) => (
          <span
            key={word.id} //The key to each word is the id assigned during split
            onMouseUp={() => {
              toggleWordSelection(lastClicked, word.id); // lastclicked and the end word of the drag is sent as parameters
            }}
            onMouseDown={() => {
              setLastClicked(word.id); //id of the first word of the drag is set as lastclicked
            }}
            style={{
              fontSize: '25px',
              backgroundColor: word.isSelected ? 'orange' : 'transparent', //Highlighted as orange when isSelected is true else transparent
            }}
          >
            {word.text}{' '} {/*Each word that is split based on space is appended with a space*/}
            {/* <sub>{word.id === lastClicked ? `${word.category.join(', ')} ` : ''}</sub> */}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Prodigy;