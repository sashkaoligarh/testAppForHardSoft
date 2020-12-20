import React, { useEffect } from 'react'
import { 
    View,
    TouchableOpacity,
    Text,
} from 'react-native'
import {useDispatch} from 'react-redux'
import {testFetched, testFetching, testFetchingError} from '../redux/reducers'
import  { getTest } from '../api/api'

const Home = ({navigation}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(testFetching())
        getTest()
        .then(test => {
            dispatch(testFetched(test))
        })
        .catch(e => dispatch(testFetchingError(e)))
    },[])
    return (
        <>
            <View style={{marginTop:100, justifyContent:'center', alignItems:'center'}}>
                <HomeItem 
                itemName='StartGame'
                navigation={navigation}/>
            </View>
        </>
    )
}

const HomeItem = (props) => {
    return (
        <TouchableOpacity
        onPress={() => props.navigation.navigate(props.itemName)}>
        <View  >
          <Text style={{fontSize:40}}>{props.itemName}</Text>
        </View>
      </TouchableOpacity>
    )
}

export default Home