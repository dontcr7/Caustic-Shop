 {
    // Inicializar la base de datos
     var firebaseConfig = {
        apiKey: "AIzaSyDL1VWgg3orQRRRBgWlFJ3M4pNqq_1WPPc",
        authDomain: "camisetas-83318.firebaseapp.com",
        databaseURL: "https://camisetas-83318.firebaseio.com",
        projectId: "camisetas-83318",
        storageBucket: "camisetas-83318.appspot.com",
        messagingSenderId: "566791460262",
        appId: "1:566791460262:web:b2461b3a53cf202110ab67",
        measurementId: "G-TZDDW9G376"
      };
    firebase.initializeApp(config);

    var database = firebase.database();

    var id;
    var color;
    var descripcion;
    var nombre;
    var precio;
    var talla;

    $("#imagen").change(function()
    {
        var descriptor=new FileReader();
        descriptor.readAsDataURL(this.files[0]);

        descriptor.onloadend = function()
        {
            imagen=descriptor.result;
            $("#previsualizacion").attr("src",imagen);
        };
    });


    $("#formularioAlta").change(function()
    {
        articulo=$("#articulo").val();
        descripcion=$("#descripcion").val();
        precio=$("#precio").val();

        if (articulo && descripcion && precio)
        {
            $("#botonGuardar").prop("disabled",false);
        }
        else
        {
            $("#botonGuardar").prop("disabled",true);
        }

    });


    $("#botonGuardar").click(function()
    {
        id=$("#id").val();
        articulo=$("#id").val();
        articulo=$("#id").val();
        descripcion=$("#descripcion").val();
        precio=$("#precio").val();

        if (!imagen)
        {
            imagen="NONE";
        }

        // Indicamos que la referencia base de nuestra base de datos es productos (algo así como el padre)
        // del que colgarán el resto de nodos hijos.
        /*
        var usersRef = new Firebase('https://samplechat.firebaseio-demo.com/users');
        var fredRef = usersRef.child('fred');
        var fredFirstNameRef = fredRef.child('name/first');
        */
        var referencia=database.ref("contactos");


        // De la siguiente forma el método sobreescribe los datos
    /*
        referencia.set(
        {
            id: id,
            color: descripcion,
            descripcion: precio,
            nombre: nombre,
            precio: precio,
	    talla: talla
        });
        */

        // Ahora estamos poniendo el articulo como clave en la colección
        // De esta manera podremos añadir nuevos articulos o actualizar uno ya existente.

    /*
        referencia.child(articulo).set(
        {
            descripcion: descripcion,
            precio: precio,
            imagen: imagen
        });
        */

        // Si queremos permitir que hayas artículos con nombres duplicados entonces tendremos
        // que decirle a Firebase que utilice otra clave en lugar del nombre del articulo.
        // Usaremos el método push en lugar de set
        referencia.push(
        {
            articulo: articulo,
            descripcion: descripcion,
            precio: precio,
            imagen: imagen
        },function()
        {
            alert('El alta se ha realizado correctamente');
        });
    });

});