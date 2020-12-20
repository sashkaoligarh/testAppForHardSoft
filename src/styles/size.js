import {Dimensions} from 'react-native';

export const calculatedHeight = (mn) => {

    const windowHeight = Dimensions.get('window').height;
    let itemsPerRow = mn;  
  
    let size = windowHeight * (itemsPerRow);
    return size;
  };
export const calculatedWidth = (mn) => {
  
    const windowWidth = Dimensions.get('window').width;
    let itemsPerRow = mn;  
  
    let size = windowWidth * (itemsPerRow);
    return size;
  };