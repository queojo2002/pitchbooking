import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { appColor } from '../../constants/appColor';

const UserTermsAndConditionsScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Các Điều Khoản Và Quy Định Về Dịch Vụ</Text>
                
                <Text style={styles.sectionTitle}>1. Phạm vi dịch vụ</Text>
                <Text style={styles.content}>
                    • Mô tả chi tiết về dịch vụ được cung cấp, bao gồm các tính năng, sản phẩm hoặc dịch vụ cụ thể được cung cấp.
                    {"\n"}• Thông tin về việc sử dụng dịch vụ, bao gồm ai có quyền truy cập và mục đích sử dụng dịch vụ.
                </Text>
                
                <Text style={styles.sectionTitle}>2. Thời gian và Địa điểm</Text>
                <Text style={styles.content}>
                    • Xác định thời gian và địa điểm cụ thể của dịch vụ, bao gồm cả thời gian dự kiến cho mỗi phần của dịch vụ (nếu có).
                </Text>
                
                <Text style={styles.sectionTitle}>3. Phí và Thanh toán</Text>
                <Text style={styles.content}>
                    • Mô tả chi tiết về cách tính phí dịch vụ và bất kỳ chi phí phát sinh nào khác, cũng như thời gian và cách thức thanh toán.
                    {"\n"}• Thông tin về các phương thức thanh toán được chấp nhận và các điều kiện thanh toán.
                </Text>
                
                <Text style={styles.sectionTitle}>4. Hủy bỏ và Hoàn tiền</Text>
                <Text style={styles.content}>
                    • Quy định về chính sách hủy bỏ và điều kiện để nhận hoàn tiền, bao gồm cả thời gian cần thông báo trước để hủy bỏ và mức độ hoàn tiền (nếu có).
                    {"\n"}• Các quy định cụ thể về việc hủy bỏ và điều kiện áp dụng.
                </Text>
                
                <Text style={styles.sectionTitle}>5. Trách nhiệm và Bảo hiểm</Text>
                <Text style={styles.content}>
                    • Xác định trách nhiệm của mỗi bên trong trường hợp có thiệt hại hoặc mất mát, cũng như yêu cầu về bảo hiểm (nếu cần).
                    {"\n"}• Thông tin về các yêu cầu bảo hiểm và các quy định liên quan đến trách nhiệm.
                </Text>
                
                <Text style={styles.sectionTitle}>6. Quyền Sở hữu và Sử dụng dữ liệu</Text>
                <Text style={styles.content}>
                    • Xác định quyền sở hữu của dữ liệu và tài sản liên quan đến dịch vụ, cũng như cách thức sử dụng chúng.
                    {"\n"}• Điều khoản về việc bảo vệ và chia sẻ thông tin.
                </Text>
                
                <Text style={styles.sectionTitle}>7. Chấp thuận và Xác nhận</Text>
                <Text style={styles.content}>
                    • Quy định về việc chấp thuận và xác nhận các điều khoản và điều kiện của dịch vụ, bao gồm cách thức chấp thuận bằng văn bản.
                    {"\n"}• Quy trình chấp thuận và xác nhận của người dùng.
                </Text>
                
                <Text style={styles.sectionTitle}>8. Giải quyết Tranh chấp</Text>
                <Text style={styles.content}>
                    • Quy định cách giải quyết tranh chấp, bao gồm việc sử dụng trọng tài, pháp luật hoặc các phương thức khác.
                    {"\n"}• Thông tin về quy trình giải quyết tranh chấp và quyền lợi của các bên.
                </Text>
                
                <Text style={styles.sectionTitle}>9. Điều khoản Bổ sung</Text>
                <Text style={styles.content}>
                    • Bất kỳ điều khoản bổ sung nào mà bất kỳ bên nào cũng cần thêm vào hợp đồng.
                    {"\n"}• Thông tin về việc thêm các điều khoản bổ sung và quy trình thông báo cho các bên liên quan.
                </Text>
                
                <Text style={styles.sectionTitle}>10. Thay đổi và Sửa đổi</Text>
                <Text style={styles.content}>
                    • Quy định về việc thay đổi hoặc sửa đổi các điều khoản và điều kiện của dịch vụ và cách thức thực hiện điều này.
                    {"\n"}• Quy trình thông báo và áp dụng các thay đổi cho các bên liên quan, cũng như cách thức thực hiện việc thông báo và hiệu lực của các sửa đổi.
                </Text>
                <Text style={styles.sectionTitle}>11. Hiệu lực và Hủy bỏ</Text>
            <Text style={styles.content}>
                • Quy định về hiệu lực của hợp đồng và các điều kiện để hủy bỏ hợp đồng.
                {"\n"}• Thông tin về các trường hợp mà hợp đồng có thể được hủy bỏ và quy trình hủy bỏ hợp đồng.
            </Text>
            
            <Text style={styles.sectionTitle}>12. Luật áp dụng và Thẩm quyền</Text>
            <Text style={styles.content}>
                • Xác định luật áp dụng và thẩm quyền mà bất kỳ tranh chấp nào có thể được giải quyết.
                {"\n"}• Thông tin về việc áp dụng luật pháp và quyền lợi của các bên trong quá trình giải quyết tranh chấp.
            </Text>
        </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 10,
        color: appColor.lightBlue,
        marginBottom: 10,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: appColor.darkGray,
        marginTop: 15,
        marginBottom: 5,
    },
    content: {
        fontSize: 16,
        color: "appColor.darkGray",
        lineHeight: 24,
        marginBottom: 15,
    },
});


export default UserTermsAndConditionsScreen;
