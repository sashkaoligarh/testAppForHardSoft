import React, { useState, useEffect } from 'react'
import { View, Text, Button, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import {concatAnswers} from '../utils/correctAnswers'
import {msToTime} from '../utils/msToTime'
import {testFetched, testFetching, testFetchingError} from '../redux/reducers'
import {calculatedHeight, calculatedWidth} from '../styles/size'

import  { getTest } from '../api/api'
import { Html5Entities } from 'html-entities'; 


const Game = () => {
    const [number, setNumber] = useState(0)
    const [refresh, setRefresh] = useState(0)
    const [allAnswers, setAllAnswers] = useState([])
    const [result, setResult] = useState(0)
    const [timeStart, setTimeStart] = useState(0)
    const [timeEnd, setTimeEnd] = useState(0) 
    const loading = useSelector(state => state.loading)
    const test = useSelector(state => state.items)
    const dispatch = useDispatch()
    const entities = new Html5Entities();

    const increment = (res, num) => {
        if(res === test[num].correct_answer){ 
            setResult(result + 1)
        }
        setNumber(num+1)
    }

    useEffect(() => {
        dispatch(testFetching())
        getTest()
        .then(test => {
            dispatch(testFetched(test))
            setTimeStart(new Date())
            setNumber(0)
            setResult(0)
        })
        .catch(e => dispatch(testFetchingError(e)))
    },[refresh])


    useEffect(() => {
        test ? setAllAnswers(concatAnswers(test, number)) : null
        setTimeEnd(new Date())
    },[number])
    

    return (
        <>
            {loading ? 
                <ActivityIndicator size={'large'} color={'0000'} style={{marginTop:200}} />
            :
                number < 10 ? 
                    <View style ={styles.game}>
                        <Text style ={styles.info}>Category:  {test[`${number}`].category}</Text>
                        <Text style ={styles.info}>Question:  {number+1}</Text>
                        <Text style={styles.question}>{entities.decode(test[`${number}`].question)}</Text>
                        <View style={styles.answers} >
                            {allAnswers ? allAnswers.map(item => (
                                <TouchableOpacity  key={item} onPress = {() => increment(item, number)}>
                                    <Text style={styles.answer} >{item}</Text>
                                </TouchableOpacity>
                                )) : null
                            }
                        </View>
                    </View> 
                :  
                    <View style ={styles.game}>
                        <Text style={styles.info}>result {result} / 10</Text>
                        <Text style={styles.info}>Time {msToTime(timeEnd.getTime() - timeStart.getTime())}</Text>
                        <TouchableOpacity
                        onPress={() => setRefresh(refresh+1) }
                        style={styles.replay}
                        >
                            <Text style={styles.question}>Play again</Text>
                        </TouchableOpacity>
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    game:{
        width:calculatedWidth(1),
        marginTop:50, 
        alignItems:'center',
    },
    answer:{
        borderWidth:1,
        borderColor:'black',
        width: calculatedWidth(0.35),
        height: calculatedHeight(0.08),
        textAlign:'center',
        margin: 10,
    },
    answers:{
        flexDirection:'row',
        flexWrap:'wrap',
        width:calculatedWidth(0.9),
        alignItems:'center',
        justifyContent:'center',
    },
    question:{
        margin:10,
        fontSize:calculatedWidth(0.07),
        minHeight:calculatedHeight(0.35)
    },
    info:{
        minHeight:calculatedHeight(0.10),
        margin:0,
        fontSize:calculatedWidth(0.05)
    },
    replay:{
        width:calculatedWidth(0.4),
        height:calculatedHeight(0.1),
        borderWidth:3,
        borderColor:'black',
    }


})
export default Game
