$(document).ready(function () {


    // ~~~~~~~~~~~~~~~~~~~~ Register ~~~~~~~~~~~~~~~~~~~~
    var storedWarehouse; // 토글에 선택된 창고
    var registerPid;    // 등록된 상품 id
    var palletQuantity;  // 파레트별 상품 사이즈
    var wwwname;

    $(document).on('click', '.open-modal-btn', function () {
        var pid = $(this).attr('data-pid');
        var name = $(this).attr('data-name');
        var firstcategory = $(this).attr('data-firstcategory');
        var secondcategory = $(this).attr('data-secondcategory');
        var thirdcategory = $(this).attr('data-thirdcategory');
        var palletperquantity = $(this).attr('data-palletperquantity');
        var type = $(this).attr('data-type');

        registerPid = pid;
        palletQuantity = palletperquantity;


        // 모달에 정보를 채웁니다
        $('#myModal41 .modal-title').text('입고등록');
        $('#firstcategory').val(firstcategory);
        $('#secondcategory').val(secondcategory);
        $('#thirdcategory').val(thirdcategory);
        $('#name').val(name);
        $('#palletperquantity').val(palletperquantity);
        $('#type').val(type);

        console.log(type);

        $.ajax({
            url: '/ssglanders/getWarehouseList',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({type: type}),
            success: function (response) {
                response.forEach(function (warehouse) {
                    var warehouseName = warehouse['wname'];
                    var warehouseAddress = warehouse['address'];
                    var optionElement = '<option value="' + warehouseName + '">' + warehouseName + ' - ' + warehouseAddress + '</option>';
                    // 이미 존재하는지 확인 후 추가
                    if (!$('.search-warehouse-toggle-1 select option[value="' + warehouseName + '"]').length) {
                        $('.search-warehouse-toggle-1 select').append(optionElement);
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });

        // 토글에서 선택된 warehouseName을 저장
        $(document).on('change', '.search-warehouse-toggle-1 select', function () {
            storedWarehouse = $(this).val();
        });
    });

    // 데이터 제출 함수
    $(document).on('click', '.register-button', function () {
        submitData();
        storedWarehouse = null;
    });

    // 모달 닫기 이벤트 핸들러
    $('#myModal41').on('click', 'register-button', function () {
        $('#myModal41').modal('hide');
    });


    // 모달 바깥 부분 클릭시 원래 데이터 날아가기
    $(document).on('click', function (event) {
        // 모달 내부를 클릭한 경우 무시
        if ($(event.target).closest('.modal-dialog').length === 0) {
            // 모달 창이 열려 있는지 확인
            if ($('#myModal41').hasClass('show')) {
                // 모달 창 닫기
                $('#myModal41').modal('hide');
                // 데이터 초기화
                $('#quantity').val('');
                $('#regdate').val('');
                $('#type').val('');
                $('.search-warehouse-toggle-1 select').val('---'); // 선택 옵션 초기화
            }
        }
    });

    function submitData() {
        var pid = registerPid;
        var palletperquantity = $('#palletperquantity').val();
        var quantity = $('#quantity').val();
        var regdate = $('#regdate').val();
        var type = $('#type').val();


        $.ajax({
            url: '/ssglanders/inRegister',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                pid: pid,
                name: storedWarehouse,
                palletperquantity: palletperquantity,
                quantity: quantity,
                regdate: regdate,
                type: type
            }),
            success: function (response) {
                // 성공 시 처리
                // 모달 창 닫기 및 값 초기화
                $('#myModal41').modal('hide');
                $('#quantity').val('');
                $('#regdate').val('');
                $('#type').val('');
                $('.search-warehouse-toggle-1 select').val('---'); // 선택 옵션 초기화
                $('#myModal41').modal('hide');
                location.reload();
                alert('등록 완료됐습니다.');
            },
            error: function (xhr, status, error) {
                alert('다시 등록해주세요');
            }
        });


    }


    // ~~~~~~~~~~~~~~~~~~~~ List ~~~~~~~~~~~~~~~~~~~~
    var modifyWareHouseName;
    var updateIid;
    var updatePid;
    var updateWid;
    var updateQuantity;
    var updateDate;
    var storedQuantity;
    var updateStatusOO;
    var updateApproval;

    $(document).on('click', '.open-modify-btn', function () {


        var iid = $(this).attr('data-iid');
        var pid = $(this).attr('data-pid');
        var wid = $(this).attr('data-wid');
        var quantity = $(this).attr('data-quantity');
        var date = $(this).attr('data-date');
        var statusOO = $(this).attr('data-status');
        var approval = $(this).attr('data-approval');
        var name = $(this).attr('data-name');
        var type = $(this).attr('data-type');
        var palletperquantity = $(this).attr('data-palletperquantity');
        var firstcategory = $(this).attr('data-firstcategory');
        var secondcategory = $(this).attr('data-secondcategory');
        var thirdcategory = $(this).attr('data-thirdcategory');

        console.log(iid, pid, wid, quantity, date, statusOO, approval, name, type, palletperquantity, firstcategory, secondcategory, thirdcategory);

        updateIid = iid;
        updatePid = pid;
        updateWid = wid;
        updateQuantity = quantity;
        updateDate = date;
        updateStatusOO = statusOO;
        updateApproval = approval;
        storedQuantity = palletperquantity;


        // 모달에 정보를 채웁니다
        $('#myModal42 .modal-title').text('입고수정');
        $('#firstcategory').val(firstcategory);
        $('#secondcategory').val(secondcategory);
        $('#thirdcategory').val(thirdcategory);
        $('#name').val(name);
        $('#palletperquantity').val(palletperquantity);
        $('#quantity').val(quantity);
        $('#regdate').val(date);
        $('#type').val(type);
        $('#status').val(statusOO);


        $.ajax({
            url: '/ssglanders/getWarehouseList',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({type: type}),
            success: function (response) {
                response.forEach(function (warehouse) {
                    var warehouseName = warehouse['wname'];
                    var warehouseAddress = warehouse['address'];
                    var optionElement = '<option value="' + warehouseName + '">' + warehouseName + ' - ' + warehouseAddress + '</option>';
                    // 이미 존재하는지 확인 후 추가
                    if (!$('.search-warehouse-toggle-1 select option[value="' + warehouseName + '"]').length) {
                        $('.search-warehouse-toggle-1 select').append(optionElement);
                    }
                });

            },
            error: function (xhr, status, error) {
                console.error(error);
                alert(error + '수정 실패했습니다.');
            }

        });


        // 토글에서 선택된 warehouseName을 저장
        $(document).on('change', '.search-warehouse-toggle-1 select-incoming-toggle select', function () {
            modifyWareHouseName = $(this).val();

        });
    });
    //------------------업데이트------------------

    // 데이터 제출 함수
    $(document).on('click', '.update-button', function () {

        var quantity = $('#quantity').val();
        var regdate = $('#regdate').val();

        console.log(quantity);
        console.log(regdate);
//조건변경 필요
        if (updateStatusOO === '배송전'){


            $.ajax({
                url: '/ssglanders/updateIncoming',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    iid: updateIid,
                    pid: updatePid,
                    wid: updateWid,
                    quantity: quantity,
                    regdate: regdate,
                    status: updateStatusOO,
                    approval: updateApproval
                }),
                success: function (response) {
                    // 성공 시 처리
                    // 모달 창 닫기 및 값 초기화
                    $('#myModal42').modal('hide');
                    $('#quantity').val('');
                    $('#regdate').val('');
                    $('#type').val('');
                    $('.search-warehouse-toggle-1 select').val('---'); // 선택 옵션 초기화
                    alert('수정 성공했습니다.')
                    location.reload();
                },
                error: function (xhr, status, error) {
                    alert('수정 실패했습니다.');
                }
            });
        }else {
            alert('배송후에는 수정할 수 없습니다.')
        }

    });

    //------------------삭제------------------

    $(document).on('click', '.delete-button', function () {

        console.log(updateStatusOO);



        if (updateStatusOO === '배송전') {

            $.ajax({
                url: '/ssglanders/deleteIncoming',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    iid: updateIid
                }),
                success: function (response) {
                    // 성공 시 처리
                    // 모달 창 닫기 및 값 초기화
                    $('#myModal42').modal('hide');
                    $('#quantity').val('');
                    $('#regdate').val('');
                    $('#type').val('');
                    $('.search-warehouse-toggle-1 select').val('---'); // 선택 옵션 초기화
                    location.reload();
                },
                error: function (xhr, status, error) {
                    alert('삭제를 실패했습니다.');
                }
            });

        }else{
            alert('배송 후에는 삭제할 수 없습니다.')
        }

    });

    // 모달 닫기 이벤트 핸들러
    $('#myModal42').on('hidden.bs.modal', function () {
        // 모달 닫힐 때 전역 변수 초기화
        modifyWareHouseName = null;
        storedQuantity = null;
    });


    $('.open-delivery-button').on('click', function () {
        // data-iid 값을 가져옴
        var iid = $(this).data('iid');
        var status100 = $(this).data('status');
        var approvalData = $(this).data('approval');

        console.log(iid);
        console.log(status100);
        console.log(approvalData);


        // 확인 버튼 클릭 시
        if (confirm("배송 상태를 변경하시겠습니까?")) {
            if (approvalData === '승인완료'){

                // Ajax 처리
                $.ajax({
                    url: '/ssglanders/changeStatus',
                    type: 'POST', // 또는 'GET'
                    contentType: 'application/json',
                    data: JSON.stringify({
                        iid: iid
                    }), // 요청에 포함할 데이터
                    success: function (response) {
                        // 처리가 성공하면 추가 작업 수행
                        alert('배송 상태가 변경되었습니다.');
                        location.reload();
                    },
                    error: function (xhr, status, error) {
                        // 오류 처리
                        alert('오류가 발생했습니다.');
                        console.error(xhr.responseText);
                    }
                })
            }else {
                alert('승인 완료 시 누를 수 없는 버튼입니다.')
            }

        }

    });

    //------------------승인------------------
    $('.incoming-approval-button').on('click', function () {
        // data-iid 값을 가져옴
        var iid = $(this).data('iid');
        var status100 = $(this).data('status');
        var quantity = $(this).data('quantity');
        var wid = $(this).data('wid');
        var approval = $(this).data('approval');

        console.log(iid);
        console.log(status100);
        console.log(quantity);
        console.log(wid);
        console.log(approval);

        // 확인 버튼 클릭 시
        if (confirm("입고를 승인하시겠습니까?")) {

            if (status100 === '배송전'){
                // Ajax 처리
                $.ajax({
                    url: '/ssglanders/approveApprovalData',
                    type: 'POST', // 또는 'GET'
                    contentType: 'application/json',
                    data: JSON.stringify({
                        iid: iid
                    }), // 요청에 포함할 데이터
                    success: function (response) {
                        $.ajax({
                            url: '/ssglanders/checkWarehouseCapacity',
                            method: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                wid: wid,
                                quantity: quantity
                            }),
                            success:function (response2){
                                if (response2 === true){
                                    approval = '승인완료';
                                    alert('승인되었습니다.');
                                    location.reload();
                                }else{
                                    alert('선택한 창고의 수용가능량보다 많은 파레트 등록입니다. 승인할 수 없습니다.');
                                    location.reload();
                                }
                            },error:function (xhr, status, error){
                                alert('올바른 정보가 아닙니다.')
                            }
                        });
                    },
                    error: function (xhr, status, error) {
                        // 오류 처리
                        alert('승인되지 않았습니다.')
                    }
                })
            }else{
                alert('이미 배송후입니다');
            }
        }

    });


    $('.outcoming').on('click', function () {
        window.location.href = '/ssglanders/outApproval';
    });

    $('.incoming').on('click', function () {
        window.location.href = '/ssglanders/inApproval';
    });


    // -----------페이지네이션-----------
})
