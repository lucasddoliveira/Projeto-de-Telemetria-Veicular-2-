import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
    },

    headerContainer: {
        backgroundColor: 'white',
        padding: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation:10,
        marginBottom: -17,
    },

    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 25, 
        color: '#000',
        marginRight: 25,
    },

    butttonsFiltro: {
        
        borderRadius: 10,
        //borderColor: '#e8e8e8',
        paddingHorizontal: 10,
        margin : 5,
        backgroundColor: '#e8e8e8'
    },
    
    textButtons: {
        fontSize: 18,
        color: '#001374',
        fontWeight: 'bold'

    },

   

    textContCronometro: {
        fontSize: 18,
        color: '#000',
    },

    contaCronometro:{
        marginTop: 20,
        height: 30,
        marginTop: 5
    },

    textButtCronometro:{
        fontSize: 18,
        color: '#fff',
    },

    buttonCronometro:{
        borderRadius: 10,
        borderColor: '#e8e8e8',
        width: "30%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#001374',
        marginBottom: 2.5,
        marginTop: 2.5,
    },
    
    areaCronometro: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-around',
        
        //marginTop: 20,
        width:"100%",
        backgroundColor:"white",
        //borderRadius:15,
        padding:15,
        paddingBottom: 5,
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    areaDado: {
        marginTop:20 ,
        //paddingBottom: 40,
        //paddingHorizontal: 15,
        width:"100%",
        backgroundColor:'#f1f1f1',
        flex: 1   
    },
    
    titleGraph: {
        fontSize: 25,
        color: '#ffff',
        marginBottom:5,
        //marginLeft: 20,
        alignSelf: 'flex-start'
    },

    areaButtons: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'

    },
    filterButton: {
        width: '80%',
        //height: 40,
        //borderBottomEndRadius:50,
        //borderBottomStartRadius:50,
        //backgroundColor: '#bbb',
        justifyContent:'center',
        alignItems: 'center'
    },
    textFiltro : {
        fontSize: 20,
        //fontWeight:'bold',
        color:'white',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        
    },

    bottomRealTime: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    viewsup:{
        backgroundColor: '#1b277a',
        flex:1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    title1:{
        fontSize: 18, 
        marginTop: 15, 
        marginLeft: 15, 
        color: '#fff',
        //backgroundColor: '#1b277a'
    },

    title2:{
        fontSize: 10, 
        marginLeft: 15, 
        color: '#fff',
    },

    title3: {
        fontSize: 18, 
        //marginTop: 15, 
        marginLeft: 15, 
        color: '#000',
    },

    title4:{
        fontSize: 10, 
        marginLeft: 15, 
        color: '#000',
    },

    chartView: {
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center', 
        //marginTop: 10,
        backgroundColor: '#1b277a', 
        width: '100%',
    },

    buttomContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        flexWrap: 'wrap', 
        //marginTop: 15, 
        marginBottom: 12, 
        width: '100%',
        height: 280,
        padding: 10, 
        alignSelf: 'center', 
        //borderRadius: 15, 
        //elevation:5,
        backgroundColor:"#1b277a", 
        flex: 1,
        //borderWidth: 1, 
        //borderColor: '#b6bec8',
    },
    
    line: {
        flexDirection: 'column',
        backgroundColor: '#1b277a',
        //width: '100%',
        //height: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    line2: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '85%',
        height: 2,
        alignSelf: 'center',
    },
    
    line3: {
        width: '85%',
        alignSelf: 'center',
    },

})

export default styles