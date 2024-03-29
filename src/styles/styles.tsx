import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    container2: {
        ...StyleSheet.absoluteFillObject,
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
    ...StyleSheet.absoluteFillObject,
    },
    blackbutton:{
        zIndex: 9999,
        height:50,
        width:50,
        backgroundColor:'gray',
        borderRadius:100,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:3,
        },
        shadowOpacity:0.27,
        shadowRadius:4.65,
        elevation:6,
    },
    backgroundComponent : {
        position: 'absolute',
        //backgroundColor:'#5856d6',
        backgroundColor:'#Ff7200',
        width:1000,
        height:1200,
        top:-400,
        transform: [
            {rotate:'-70deg'},
        ],
    },
    title:{
        color:'white',
        fontSize:30,
        fontWeight:'bold',
        marginTop:20,
        alignSelf:'center',
    },
    label_input_box : {
        marginTop:10,
        color:'white',
        fontWeight:'bold',
        height:50,
        width:'90%',
        borderColor:'white',
        borderWidth: 1,
        alignSelf:'center',
        borderRadius:10,
    },
    buttonTouch :{
        borderWidth:2,
        borderColor:'white',
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:100,
        color:'white',
    },
    textButton : {
        color:'white',
    },
    centeredView : {
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        top:-40,
    },
    containerv2 : {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    titleProtected : {
        fontSize:20,
        marginBottom:20,
    },
    productsName : {
        fontSize:20,
        color:'black',
    },
    ProductItemSeparator : {
        borderBottomWidth:2,
        marginVertical:5,
    },
    containerProductScreen:{
        flex:1,
        marginTop: 10,
        marginHorizontal: 20,
    },
    TextInputProductScreen:{
        borderWidth:1,
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:20,
        borderColor: 'rgba(0,0,0,0.2)',
        height:45,
        marginTop:5,
        marginBottom:15,
    },
    bottomLogOut: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 25,
        alignContent:'center',
        alignSelf:'center',
    },
    buttonAgregar:{
        borderRadius:20,
        paddingVertical:5,
        paddingHorizontal:10,
        height:45,
        width: '75%',
        position: 'absolute',
        bottom:0,
        alignSelf:'center',
        borderColor:'#5856D6',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainer:{
        alignItems:'center',
    },
    avatar:{
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    menuContainer:{
        marginVertical:30,
        marginHorizontal: 30,
        alignItems:'center',
    },
    menuTexto:{
        fontSize: 20,
    },
    menuBoton:{
        marginVertical: 10,
    },
});
