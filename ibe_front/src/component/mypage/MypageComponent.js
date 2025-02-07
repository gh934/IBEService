import { Col, Container, Row } from "react-bootstrap";
import "./Mypage.css";
import MemberInfoCardComponent from "./MemberInfoCardComponent";
import MemberPointCardComponent from "./MemberPointCardComponent";
import MypagePurchaseListComponent from "./MypagePurchaseListComponent";
import MypageSalesListComponent from "./MypageSalesListComponent";

const MypageComponent = () => {
    return (
        <>  
            <Container fluid>
                <Row className="mt-2">
                    <Col className="p-3" id="mypage_col_002">
                        <Row>
                            <Col className="p-2 d-flex justify-content-end">
                                {/* 회원 거래 정보 카드 */}
                                <MemberInfoCardComponent />
                            </Col>
                            <Col xs={1}/>
                            <Col className="p-2">
                                {/* 회원 포인트 정보 카드 */}
                                <MemberPointCardComponent />
                            </Col>
                            <Col xs={1}/>
                        </Row>
                        <Row>
                            <Col>
                                {/* 구매 목록 */}
                                <MypagePurchaseListComponent/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {/* 판매 목록 */}
                                <MypageSalesListComponent/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MypageComponent;
