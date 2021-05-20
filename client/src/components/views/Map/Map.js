import React, { useEffect } from "react";
import scriptLoader from 'react-async-script-loader';

const Map = ({ id, address, isScriptLoaded, isScriptLoadSucceed, onScriptLoaded }) => {

    useEffect(() => {
        if (isScriptLoaded && isScriptLoadSucceed) {
            var mapContainer = document.getElementById('map-' + id), // 지도를 표시할 div 
                mapOption = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };

            // 지도를 생성합니다    
            var map = new window.kakao.maps.Map(mapContainer, mapOption);

            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new window.kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(address, function (result, status) {

                // 정상적으로 검색이 완료됐으면 
                if (status === window.kakao.maps.services.Status.OK) {

                    var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new window.kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });
        }
    }, [isScriptLoaded, address]);

    return (
        <div id={`map-${id}`} style={{ height: 370 }}>

        </div>
    );
};

// export default Map;
export default scriptLoader(
    [
        '//dapi.kakao.com/v2/maps/sdk.js?appkey=d922efacca59992150b7170f62934b5e&libraries=services',
    ],
)(Map);