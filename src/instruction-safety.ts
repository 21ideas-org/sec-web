/** Independent publication markers; missing/false does not establish safety. */
export interface InstructionMarkers {
  hijacked?: boolean;
  unsafeInstruction?: boolean;
}

/** Trusted copy about this message only, without an account-control inference. */
export function instructionWarning(vendor: string | undefined, locale: 'ru' | 'en' = 'ru') {
  return locale === 'en'
    ? {
        title: `The message from ${vendor ?? 'the vendor'} contains a dangerous instruction.`,
        action: 'Do not carry out the dangerous action described.',
      }
    : {
        title: `В сообщении от ${vendor ?? 'вендора'} есть опасная инструкция.`,
        action: 'Не выполняйте описанное опасное действие.',
      };
}
