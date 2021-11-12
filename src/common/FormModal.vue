<template>
  <BasicModal
    @register="register"
    v-bind="$attrs"
    :title="title"
    @ok="okModal"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :schemas="schemas" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { basicProps } from '/@/components/Modal/src/props';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage, notification } = useMessage();
  const props = defineProps(
    Object.assign(
      {
        title: {
          type: String,
          default: '新增|编辑',
        },
        fromData: { type: Object },
        schemas: { type: Array },
        okApi: { type: Function, default() {} },
      },
      basicProps,
    ),
  );
  const emit = defineEmits(['register', 'handleOkSuccess']);

  const [registerForm, { setFieldsValue, resetFields, getFieldsValue, validate }] = useForm({
    showActionButtonGroup: false,
  });

  const [register, { closeModal, setModalProps }] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    setFieldsValue(data);
  }

  function handleVisibleChange(v) {
    v && props.fromData && nextTick(() => onDataReceive(props.fromData));
  }
  async function okModal() {
    const isValid = await validate();
    if (isValid) {
      setModalProps({ confirmLoading: true });
      const values = getFieldsValue();
      const res = await props.okApi(values);
      setModalProps({ confirmLoading: false });
      if (res) {
        resetFields();
        closeModal();
        emit('handleOkSuccess');
        notification.success({
          message: '操作成功',
          description: ``,
          duration: 3,
        });
      }
    } else {
      createMessage.error('验证失败，请填写完整信息');
    }
  }
</script>
