import { setupRegion } from "@/api";
import { TableData } from "@/api/type";
import { Form, FormInstance, Input, Modal } from "@arco-design/web-react";
import { useEffect, useRef, useState } from "react";

const FormItem = Form.Item;

type ChangeComponentType = {
  updateModal: () => void;
  currentItemData: TableData;
  init: () => void;
};

export default function ChangeComponent({
  updateModal,
  currentItemData,
  init,
}: ChangeComponentType) {
  const [visible, setVisible] = useState<boolean>(true);

  const formRef = useRef<FormInstance>(null);

  const changeVisible = (val: boolean) => {
    setVisible(val);
    updateModal();
  };

  const submit = () => {
    try {
      formRef.current?.validate().then((res) => {
        setupRegion(currentItemData.id as string, {
          regionName: res.name,
          remark: res.remark,
        }).then(({ data }) => {
          if (data) {
            changeVisible(false);
            init();
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Modal
        title="Modal Title"
        visible={visible}
        onOk={submit}
        onCancel={() => changeVisible(false)}
        closable={false}
      >
        <Form
          ref={formRef}
          requiredSymbol={true}
          initialValues={currentItemData}
        >
          <FormItem label="区域名称" field="name" rules={[{ required: true }]}>
            <Input />
          </FormItem>
          <FormItem
            label="备注说明"
            field="remark"
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
}
