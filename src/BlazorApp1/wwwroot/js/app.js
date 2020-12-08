
function stablishConnection(cb) {
    let connection = new signalR.HubConnectionBuilder()
        .withUrl('@settings.Value.SignalrHubUrl/hub/notificationhub', {
            accessTokenFactory: () => {
                return "Authorization", getToken();
            }
        })
        .withAutomaticReconnect()
        .build(); 
            
    connection.start().then(function () {
        console.log('User Registered to Signalr Hub');
        cb(connection);
    });       
}


function registerNotificationHandlers(connection) {
    connection.on("UpdatedOrderState", (message) => {
        toastr.success('Updated to status: ' + message.status, 'Order Id: ' + message.orderId);
        if (window.location.pathname.split("/").pop() === 'Order') {
            refreshOrderList();
        }
    });
}


function getToken() {
    return '@Context.GetTokenAsync("access_token").Result';
}


function refreshOrderList() {
    clearTimeout(timerId);
    timerId = setTimeout(function () {
        window.location.reload();
    }, 1000);
}
