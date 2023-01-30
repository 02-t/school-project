import { Platform, StyleSheet, StatusBar } from 'react-native'


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },

    container_white: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 4,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    header: {
        fontWeight: 'bold',
        fontSize: 26,
        marginBottom: 6
    },

    header2: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 6
    },
    
    header3: {
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
        marginTop: -5
    },

    italic: {
        fontStyle: 'italic',
        fontSize: 14,
        textAlign: 'center'
    },

    main_items_container: {
        padding: 0,
        flexDirection: 'row',
        height: 80,
        width: '100%',
        alignItems:'flex-start',
        marginTop: 4,
        marginBottom: 4
    },
    
    main_items_thumbnail: {
        borderRadius: 16,
        height: '100%', 
        width: undefined,
        aspectRatio: 1,
    },

    scroll_view: {
        width: '90%',
        marginTop: 10,
        marginBottom: 16
    },

    audio_button: {
        height: '100%',
        width: undefined,
        resizeMode: 'contain',
        aspectRatio: 1,
        alignSelf: 'center',
        marginLeft: 3,
        marginRight: 3
    }
})