package com.project.ibe.dto.order;

import lombok.Data;

//거래완료
@Data
public class OrderCompleteRequest {
    private Long orderId;
    private Long productId;
}
